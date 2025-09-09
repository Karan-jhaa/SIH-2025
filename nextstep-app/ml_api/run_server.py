# run_server.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend_app:app", host="127.0.0.1", port=8003)
