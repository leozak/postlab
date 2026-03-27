from typing import Annotated, Sequence
from langgraph.graph.message import BaseMessage, add_messages

class State:
  messages: Annotated[Sequence[BaseMessage], add_messages]
  source: str
  title: str
  text: str
  summary: str
