## Some sample prompts used during the development of this project (both back-end and front-end):

```bash
Create a @app.get endpoint for "/pokemon" that accepts an offset and a limit query params and returns a JSON with this form: {"count":1302,"next":"https://pokeapi.co/api/v2/pokemon?offset=180&limit=20","previous":"https://pokeapi.co/api/v2/pokemon?offset=140&limit=20","results": []}
where "results" is an array of objects that all of them have a name: string and url: string attributes. Take that information from a JSON file. Create a sample JSON file for that where it's more convinient.
```

```bash
Add a get method to main.py for the endpoint /pokemon/{pokemon_id} where pokemon_id is an int and it looks into pokemon_detail_data.json and returns the index of the array pokemon_id - 1
```

```bash
The following is a paginated API endpoint: https://pokeapi.co/api/v2/pokemon

Use @tanstack/react-query to call this endpoint using pagination, 20 items per page, use Mui Card components to show the results. Display one card per item and show the attribute "name" on every card. Then, call the next page when the user scrolls to the bottom of the page.
```

Sometimes is useful to use AI even to write simple functions like the following, to save time:

```bash
Write a function that receives a string and returns the same string but with the first letter capitalized.
```

Promt:

````bash
Where it says "Add more details as needed" Add three Mui Tabs: Abilities, Moves and Forms. Make possible to switch between them saving the active tab in the component's state.

Adjust:
```bash
The tabs were quickly setup and then I just had to add the proper content to every one of them.
````
