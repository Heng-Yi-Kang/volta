import os
import shutil

def upload_pdf(files):
    os.makedirs("uploads", exist_ok=True)
    for file in files:
        file_location = f"uploads/{file.filename}"
        with open(file_location, "wb") as file_object:
            shutil.copyfileobj(file.file, file_object)
            print(f"Saved file: {file_location}")
    return {"message": "Files uploaded successfully"}

def remove_pdf():
    os.rmdir("uploads")