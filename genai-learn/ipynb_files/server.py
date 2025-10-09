from fastapi import FastAPI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from langserve import add_routes

import os
from dotenv import load_dotenv
load_dotenv()

# initialize llm
groq_api_key = os.getenv("GROQ_API_KEY")
llm = ChatGroq(api_key=groq_api_key, model="openai/gpt-oss-120b", temperature=1)

#template initialization
system_template = "Translate the following English text to {language}: {text}"
prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_template),
    ("user", "{text}"),
])

parser = StrOutputParser()

# initializing chain
chain = prompt_template | llm | parser

# app initialization
app = FastAPI(
  title="LangServe with Groq LLM", 
  version="0.1",
  description="A simple API using FastAPI and LangServe with Groq LLM"
)

# chain routes
add_routes(app,chain, path="/chain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)