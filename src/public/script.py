import os
import sys

def findFiles(src_path: str, ext: str) -> list[str]:
    file_paths: list[str] = []
    for root, dirs, files in os.walk(src_path):
        for file in files:
            if file.lower().endswith(ext.lower()):
                path = os.path.join(root, file)
                file_paths.append(path)
    return file_paths

def renameToLowercase(file_path: str) -> str:
    dirname, filename = os.path.split(file_path)
    new_name = filename.lower()
    new_path = os.path.join(dirname, new_name)
    os.rename(file_path, new_path)  # Actually rename the file
    return new_path

def main(ext: str):
    source_path = os.getcwd()
    files = findFiles(source_path, ext)

    for file_path in files:
        try:
            new_path = renameToLowercase(file_path)
            print(f"Renamed: {file_path} -> {new_path}")
        except Exception as e:
            raise Exception("Error:", e)


if __name__ == "__main__":
    args = sys.argv
    if len(args) != 2:
        raise Exception('Pass in a file extension')
    main(args[1])