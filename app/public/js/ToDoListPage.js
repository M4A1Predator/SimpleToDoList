
class ToDoItemBlock extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            title : "",
            detail : "",
            mode: "view",
        }

        this.handleChange = this.handleChange.bind(this);
        this.updateToDoItem = this.updateToDoItem.bind(this);
        this.removeToDoItem = this.removeToDoItem.bind(this);
        this.changeToEditMode = this.changeToEditMode.bind(this);
        this.changeToViewMode = this.changeToViewMode.bind(this);
    }

    render(){

        let toDoItem = this.props.toDoItem;
        if(!toDoItem){
            return '';
        }

        if(this.state.mode == 'edit'){
            return (
                <div className="row">
                    <div className="col-md-8 todo-container">
                        <div className="col-md-7">
                            <form onSubmit={e => {e.preventDefault()}}>
                                <div className="form-group">
                                    <input name="title" className="form-control" type="text" placeholder="Title" 
                                        value={this.state.title} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea name="detail" className="form-control" type="text" placeholder="Detail" style={{resize: "none"}}
                                        value={this.state.detail} onChange={this.handleChange}>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button className="btn todo-btn" onClick={this.updateToDoItem}>Update</button>{" "}
                        <button className="btn todo-btn" onClick={this.changeToViewMode}>Cancel</button>
                    </div>
                </div>
            );
        }else{
            // Check status
            let checkBtn;
            if(toDoItem.status == 'pending'){
                checkBtn = (
                    <a className="todo-check-pending" href="javascript:;"
                        onClick={ e => {this.updateStatus('done')}}>
                        <h1><i className="fa fa-square-o"></i></h1>
                    </a>
                );
            }else{
                checkBtn = (
                    <a className="todo-check-done" href="javascript:;"
                        onClick={ e => {this.updateStatus('pending')}}>
                        <h1><i className="fa fa-square"></i></h1>
                    </a>
                );
            }

            return (
                <div className="row">
                    <div className="col-md-8 todo-container">
                        <div className="col-md-1">
                            {checkBtn}
                        </div>
                        <div className="col-md-6">
                            <h2>{toDoItem.title}</h2>
                            <p>{toDoItem.detail}</p>
                        </div>
                        <div className="col-md-4">
                            <a href={"/items/" + toDoItem._id}>
                                <button className="btn todo-btn">
                                    <i className="fa fa-eye"></i>
                                </button>
                            </a>
                            {" "}
                            <button className="btn todo-btn" onClick={this.changeToEditMode}>
                                <i className="fa fa-pencil-square-o"></i>
                            </button>
                            {" "}
                            <button className="btn todo-btn" onClick={this.removeToDoItem}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    // Handle change
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    changeToEditMode(event){
        let mode = 'edit';
        this.setState({
            mode: mode,
            title: this.props.toDoItem.title,
            detail : this.props.toDoItem.detail,
        })
    }

    changeToViewMode(event){
        let mode = 'view';
        this.setState({
            mode: mode,
        })
    }

    updateToDoItem(event){

        // Prepare data
        let title = this.state.title;
        let detail = this.state.detail;

        let params = {
            title : title,
            detail : detail   
        }

        // Update
        axios.put('/api/items/' + this.props.toDoItem._id, params)
        .then( (res) => {

            this.props.onItemChange();
            this.changeToViewMode();
        })
    }

    // Update item status
    updateStatus(status){
        
        // Prepare data        
        let params = {
            status: status
        }

        axios.put('/api/items/' + this.props.toDoItem._id, params)
        .then( (res) => {
            if(res.status != 200){
                console.log(res);
                return;
            }

            this.props.onItemChange();
        })
        .catch( (err) => {
            console.error(err);
        })
    }

    // Remove item
    removeToDoItem(event){
        
        axios.delete('/api/items/' + this.props.toDoItem._id)
        .then( (res) => {
            if(res.status != 200){
                console.log(res);
                return;
            }

            this.props.onItemChange();
        })
        .catch( err => {
            console.error(err);
        })
    }    

}


class ToDoItemListPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            toDoItems : [],
            title : "",
            detail : "",
            showAddForm : false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.addToDoItem = this.addToDoItem.bind(this);
        this.toggleAddForm = this.toggleAddForm.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
    }

    componentWillMount(){
        this.getToDoItems();
    }

    getToDoItems(){
        // Get to do item
        axios.get('/api/items')
        .then( (res) => {
            if(res.status != 200){
                console.error(res);
                return;
            }

            const data = res.data;
            const toDoItems = data;

            this.setState({toDoItems: toDoItems});
        })
    }

    displayToDoItems(){
        const toDoItems = this.state.toDoItems;

        if(!toDoItems){
            return '';
        }

        return toDoItems.map( (toDoItem, index) => {

            return (<ToDoItemBlock toDoItem={toDoItem} key={index} onItemChange={this.onItemChange} />)

        })

    }

    render(){

        let addForm = '';
        let addBtn = (<button className="btn" onClick={this.toggleAddForm}>Add To Do</button>)

        if(this.state.showAddForm === true){
            addBtn = '';
            addForm = (
                        <div>
                            <div className="col-md-6">
                                <form onSubmit={e => {e.preventDefault()}}>
                                    <div className="form-group">
                                        <input name="title" className="form-control input-title" type="text" placeholder="Title" 
                                            value={this.state.title} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea name="detail" className="form-control" type="text" placeholder="Detail" style={{resize: "none"}}
                                            value={this.state.detail} onChange={this.handleChange}>
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-4">
                                <button className="btn" onClick={this.addToDoItem}>Add</button>{" "}
                                <button className="btn" onClick={this.toggleAddForm}>Cancel</button>
                            </div>
                        </div>)
        }

        return (
            <div className="container">
                
                <div className="row">
                    <div className="col-md-8 todo-container">
                        <h1>TO DO LIST</h1>    
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 todo-container">
                        {addBtn}
                        {addForm}
                    </div>
                </div>
                <div className="row">
                    {this.displayToDoItems()}
                </div>
            </div>
        )
    }

    toggleAddForm(event){
        this.setState({
            showAddForm: !this.state.showAddForm
        })
    }

    // Handle change
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    // Add todo item
    addToDoItem(){
        // Prepare data
        let title = this.state.title;
        let detail = this.state.detail;

        let params = {
            title : title,
            detail : detail,
        }

        axios.post('/api/items', params)
        .then( (res) => {
            if(res.status != 200){
                console.err(res);
                return;
            }

            this.setState({
                title: "",
                detail: ""
            })
            this.getToDoItems();
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    // On item change
    onItemChange(event){
        this.getToDoItems();
    }

}

ReactDOM.render(
    <ToDoItemListPage />,
    document.getElementById("app")
)