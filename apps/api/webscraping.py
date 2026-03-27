from pydantic import BaseModel
from bs4 import BeautifulSoup
import httpx
from markdownify import markdownify

class Scraping(BaseModel):
    title: str
    text: str

async def web_scraping(url: str) -> Scraping:
    """
    Extrai e retorna o conteúdo textual principal de uma página web a partir de uma URL fornecida.
    Utilizado para obter artigos, notícias ou textos de blog com o objetivo de resumir,
    analisar ou gerar conteúdo baseado no material encontrado.
    Retorna apenas o texto relevante, limpo de anúncios, menus e outros elementos de navegação.

    Args:
        url (str): A URL da página web.

    Returns:
        Scraping:
            title (str): Título da página,
            text (str): Texto limpo e legível extraído da página, ou mensagem de erro.
    """
    print("> web_scraping")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
    }
    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
    
    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.title.text

    for script in soup(["script", "style", "nav", "footer", "aside", "header", "link", "head"]):
        script.decompose()

    markdown = markdownify(str(soup), heading_style="ATX")

    # text = soup.get_text(separator="\n")
    # lines = [line.strip() for line in text.split("\n")]
    # clean_text = "\n".join(line for line in lines if line)

    return Scraping(
        title=title,
        text=markdown
    )