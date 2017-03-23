# SimpleDotoList
    Simple To Do List web applicaiton
    Technology: NodeJS, Express, React, Bootstrap

---

API Document
====

### GET /api/items

#### usage:
	Get all To Do items

#### Success repsonse:
	Code : 200
	Array of To Do List items
	[
		{
			_id : "ItemID",
			title: "Title of to do item",
			detail: "Detail of to do item",
			status : Status of to do item must be "pedning" or "done",
			createDate : Date,
			lastModified: Date
		},
	]

#### Error repsonse:
	Code : 500
	{
		"err": "Something went wrong!"
	}

---------------------------------

### POST /api/items
	
#### usage:
	Add a To Do item

#### data params:
	{
		title: "title of to do item",
		[detail]: "detail of item", // optional
	}

#### Success repsonse:
	Code: 200
	{
	    "msg": "Item created"
	}

#### Error repsonse:
	Code : 500
	{
		"err": "Cannot add to do item"
	}

---------------------------------

### GET /api/items/:itemId

#### usage:
	Get a to do item

#### Success repsonse:
	A To Do Item object
	{
		_id: "ItemID",
		detail: "Detail of to do item",
		title: "Title of to do item",
		createDate: "2017-03-23T14:34:49.819Z",
		status: "pending" or "done",
	}

#### Error repsonse:
	Code : 500
	{
		"err": "Something went wrong!"
	}

-------------------------------------

### PUT /api/items/:itemId

#### usage:
	Update an existing To Do Item

#### data params:
	{
		[title]: Title of to do item, // optional
		[detaul]: Detail of to do item, // optional
		[status]: Status of to do item must be "pending" or "done" // optional
	}

#### Success repsonse:
	Code: 200
	{
		"msg": "Item updated"
	}

#### Error repsonse:
	Code : 500
	{
		"err": "Cannot update to do item"
	}
	
-------------------------------------

### DELETE /api/items/:itemId

#### usage:
	Delete an To Do Item

#### Success repsonse:
	{
		"msg": "Item deleted"
	}
	
#### Error repsonse:
	Code : 500
	{
		"err": "Something went wrong!"
	}
	

