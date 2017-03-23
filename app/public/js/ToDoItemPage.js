
class ToDoItemPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            toDoItem : {},
            title: "",
            detail: "",
            mode : "view",
        }

        this.handleChange = this.handleChange.bind(this);
        this.changeViewMode = this.changeViewMode.bind(this);
        this.updateToDoItem = this.updateToDoItem.bind(this);
        this.removeToDoItem = this.removeToDoItem.bind(this);
    }

    componentWillMount(){

        this.getToDoItem();

    }

    getToDoItem(){

        axios.get('/api/items/' + itemId)
        .then( (res) => {
            if(res.status != 200){
                console.error(res);
                return;
            }

            const toDoItem = res.data;
            this.setState({
                toDoItem : toDoItem,
                title: toDoItem.title,
                detail: toDoItem.detail,
            })
        })
    }

    displayToDoItem(){

        let toDoItem = this.state.toDoItem;

        if(!toDoItem){
            return '';   
        }

        // Check status
        let checkBtn;
        if(toDoItem.status == 'pending'){
            checkBtn = (
                <a className="todo-check-pending" href="javascript:;"
                    onClick={ e => {this.updateStatus(toDoItem._id, 'done')}}>
                    <h1><i className="fa fa-square-o"></i></h1>
                </a>
            );
        }else{
            checkBtn = (
                <a className="todo-check-done" href="javascript:;"
                    onClick={ e => {this.updateStatus(toDoItem._id, 'pending')}}>
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
                        <button className="btn todo-btn" onClick={this.changeViewMode}>
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

    displayUpdateForm(){

        return (
                <div className="row">
                    <div className="col-md-8 todo-container">
                        <div className="col-md-6">
                            <form>
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
                            <button className="btn" onClick={this.updateToDoItem}>Update</button>{" "}
                            <button className="btn" onClick={this.changeViewMode}>Cancel</button>
                        </div>
                    </div>
                </div>)
    }

    render(){

        let content;
        if(this.state.mode == 'view'){
            content = this.displayToDoItem();
        }else{
            content = this.displayUpdateForm();
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 todo-container">
                        <div className="col-md-1">
                            <a href="/items">
                                <h1><i className="fa fa-list"></i></h1>
                            </a>
                        </div>
                        <div className="col-md-8">
                            <h1>To Do Item</h1>
                        </div>
                    </div>
                </div>
                {content}
            </div>

        )
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeViewMode(event){
        let mode = 'view'
        if(this.state.mode == 'view'){
            mode = 'edit'
        }

        this.setState({
            mode: mode,
        });
    }

    updateToDoItem(event){

        // Prepare data
        let title = this.state.title;
        let detail = this.state.detail;

        let params = {
            title : title,
            detail : detail   
        }

        axios.put('/api/items/' + itemId, params)
        .then( (res) => {

            this.getToDoItem();
            this.changeViewMode();

        })

    }

    // Update item status
    updateStatus(itemId, status){
        
        // Prepare data        
        let params = {
            status: status
        }

        axios.put('/api/items/' + itemId, params)
        .then( (res) => {
            if(res.status != 200){
                console.log(res);
                return;
            }

            this.getToDoItem();
        })
    }

    // Remove item
    removeToDoItem(event){
        
        axios.delete('/api/items/' + itemId)
        .then( (res) => {
            if(res.status != 200){
                console.log(res);
                return;
            }

            window.location = '/items';
        })
        .catch( err => {
            console.error(err);
        })
    }   
}

ReactDOM.render(
    <ToDoItemPage />,
    document.getElementById("app"),
);
