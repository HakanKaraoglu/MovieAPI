# Node JS Movie API

Node JS Eğitimi

# Movies

| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /api/movie | 'GET' | Empty | List all movies |
| /api/movie/ | 'POS' | {'title':'Aquaman','category':'Advanced','country':'USA','imdbScore':7.3,'year':2019} | Create a new Movie |
| /api/movie/:movie_id | 'GET' | Empty | Get a Movie |
| /api/movie/:movie_id | 'PUT' | {'title':'Aquaman','category':'Advanced'} | Update a Movie with new info |
| /api/movie/:movie_id | 'DELETE' | Empty | Delete a Movie |
| /api/movie/top10 | 'GET' | Empty | Get the top 10 Movies |
| /api/movie/between/:start_year/:end_year | 'GET' | Empty | Movies between two dates |

# Directors

| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /api/directors | 'GET' | Empty | List all Directors |
| /api/directors/ | 'POS' | {'name':'Anthony','surname':'Hopkins','bio':'USA'} | Create a new Director |
| /api/directors/:director_id | 'GET' | Empty | Get a Director |
| /api/directors/:director_id | 'PUT' | {'name':'Anth'} | Update a Director with new info |
| /api/directors/:director_id | 'DELETE' | Empty | Delete a Director |
| /api/directors/best10movies | 'GET' | Empty | The Director's top 10 movies |

# Users

| Route | HTTP Verb | POST Body | Description |
| --- | --- | --- | --- |
| /register | 'POST' | {username:'foo', password:'1234'} | Create New User |