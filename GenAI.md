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

Sometimes it's useful to use AI even to write simple functions like the following, to save time:

```bash
Write a function that receives a string and returns the same string but with the first letter capitalized.
```

## An example of prompt and adjustment.

Promt:

```bash
Where it says "Add more details as needed" Add three Mui Tabs: Abilities, Moves and Forms. Make possible to switch between them saving the active tab in the component's state.
```

Adjust:

```bash
The tabs were quickly setup and then I just had to add the proper content to every one of them.
```

## A prompt that I could use for the described Gen AI problem:

```bash
Write endpoints for a CRUD of a Task model. Every task should have a title, description, status and due_date. Store the values in memory instead of a database.
```

Used to copilot to test this prompt, the result was very good:

```bash
# ...existing code...
from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.pending
    due_date: Optional[date] = None

tasks_db: List[Task] = []
task_id_counter = 1

@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    global task_id_counter
    task.id = task_id_counter
    tasks_db.append(task)
    task_id_counter += 1
    return task

@app.get("/tasks", response_model=List[Task])
def list_tasks():
    return tasks_db

@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int):
    for task in tasks_db:
        if task.id == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    for idx, task in enumerate(tasks_db):
        if task.id == task_id:
            updated_task.id = task_id
            tasks_db[idx] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for idx, task in enumerate(tasks_db):
        if task.id == task_id:
            del tasks_db[idx]
            return {"detail": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
# ...existing
```
