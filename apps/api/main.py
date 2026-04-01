import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rich import print
from rich.markup import escape

from webscraping import web_scraping
from summaryze import summaryze
from state import State
from questions import questions
from create_posts import get_posts

load_dotenv()

CORS_ORIGINS = [origins.strip() for origins in os.getenv("CORS_ORIGINS").split(",")]
LLM_MODEL = os.getenv("LLM_MODEL")
LLM_URL = os.getenv("LLM_URL")
LLM_API_KEY = os.getenv("GOOGLE_API_KEY")

app = FastAPI(
    title="PostLab API",
    description="Agente AI para criação de posts para redes sociais",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

state = State()

@app.get("/")
async def root():
    """
    Health check
    """
    return {
        "status": "online",
        "message": "API PostLab online"
    }


#
## Summarize
class SummarizeRequest(BaseModel):
    url: str

@app.post("/summarize")
async def summarize_request(request: SummarizeRequest):
    """
    Summarize text
    """
    print("---")
    print("[bold blue]> summarize request")

    text = await web_scraping(request.url)

    summaryzed_text = summaryze(text.text)

    state.source = request.url
    state.title = text.title
    state.text = text.text
    state.summary = summaryzed_text

    return {
        "title": text.title,
        "text": summaryzed_text
    }

@app.post("/questions")
async def questions_request():
    """
    Criate questions and answers
    """
    print("---")
    print("[bold cyan]> questions endpoint")
    
    questions_result = questions(state.text)

    # print(questions_result)

    return questions_result


#
## Posts
class Answer(BaseModel):
    question: str
    answer: str

class PostsRequest(BaseModel):
    ideology: str
    answers: list[Answer]

@app.post("/create-posts")
async def create_posts(request: PostsRequest):
    """
    Create posts
    """
    print("---")
    print("[bold blue]> create posts request")

    posts_request = get_posts(escape(state.text), request.ideology, request.answers)

    return posts_request