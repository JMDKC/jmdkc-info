import csv
import json

# Define the file paths
csv_file_path = 'booksload.csv'
json_file_path = 'booksloaded.json'

# Read the CSV and add data to a list
data = []
with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the list to a JSON file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Data from {csv_file_path} has been converted to {json_file_path}")