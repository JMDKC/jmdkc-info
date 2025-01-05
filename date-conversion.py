import json
from datetime import datetime

def convert_date(date_str):
    try:
        # Check for the "tbc" case or empty strings
        if date_str.lower() == "tbc" or not date_str.strip():
            return "tbc"
        # Convert to ISO-8601 format
        return datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
    except ValueError:
        # If date is in an unexpected format, keep it unchanged
        return date_str

# Load the JSON file
input_file = "concerts.json"  # Replace with your actual file path
output_file = "concerts_updated.json"

with open(input_file, "r", encoding="utf-8") as file:
    books = json.load(file)

# Process each book entry
for book in books:
    if "date" in book:
        book["date"] = convert_date(book["date"])

# Save the updated JSON
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(books, file, indent=4, ensure_ascii=False)

print(f"Dates updated and saved to {output_file}.")
