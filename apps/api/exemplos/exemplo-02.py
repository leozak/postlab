from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, add_messages
from rich import print
import operator


# 1 - Definindo o estado
class State(TypedDict):
    # Todas as implementações abaixo fazem a mesma coisa
    # modes_path: Annotated[list[str], reducer]
    # modes_path: Annotated[list[str], lambda x, y: x + y]
    # modes_path: Annotated[list[str], add_messages] # Reducer do Langchain para trabalhar com grafos/LLM
    modes_path: Annotated[list[str], operator.add]



# 2 - Definir os nodes
def node_a(state: State) -> State:
    output_state: State = {"modes_path": ["A"]}
    print("> node_a", f"{state=}", f"{output_state=}")
    return output_state

def node_b(state: State) -> State:
    output_state: State = {"modes_path": ["B"]}
    print("> node_b", f"{state=}", f"{output_state=}")
    return output_state



# 3 - Definir o builder do grafo
builder = StateGraph(State)



# 4 - Adicionar os nodes
builder.add_node("A", node_a)
builder.add_node("B", node_b)



# 5 - Adicionar as arestas
builder.add_edge("__start__", "A")
builder.add_edge("A", "B")
builder.add_edge("B", "__end__")



# 6 - Construir o grafo
graph = builder.compile()



# Imprimir o grafo em mermaid
# print(graph.get_graph().draw_mermaid())



# Pegar a resposta
response = graph.invoke({"modes_path": []})



# Resultado final
print("\n\n", f"{response=}", "\n\n")
