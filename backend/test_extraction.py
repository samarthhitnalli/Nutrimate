from app.services.extraction import extract_recipe_attributes

test_text = "Pasta with garlic and olive oil"
extracted_info = extract_recipe_attributes(test_text)
print("Extracted Info:", extracted_info)
