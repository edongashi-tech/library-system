import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFeedbackModal} from './AddFeedbackModal';
import {EditFeedbackModal} from './EditFeedbackModal';


export class Feedback extends Component{

    constructor(props){
        super(props);
        this.state={fdbs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Feedback')
        .then(response=>response.json())
        .then(data=>{
            this.setState({fdbs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteFeedback(fdbmemid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Feedback/'+fdbmemid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {fdbs, fdbmemid,fdbmemname,fdbtitle,fdbtext,fdbrating,re_issuedate,re_duedate,re_returndate,refine}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MemberID</th>
                        <th>MemberName</th>
                        <th>FeedbackTitle</th>
                        <th>FeedbackText</th>
                        <th>Rating</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {fdbs.map(fdb=>
                            <tr key={fdb.MemberID}>
                                <td>{fdb.MemberID}</td>
                                <td>{fdb.MemberName}</td>
                                <td>{fdb.FeedbackTitle}</td>
                                <td>{fdb.FeedbackText}</td>
                                <td>{fdb.Rating}</td>
                                
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        fdbmemid:fdb.MemberID,fdbmemname:fdb.MemberName,fdbtitle:fdb.FeedbackTitle,
        fdbtext:fdb.FeedbackText,fdbrating:fdb.Rating})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFeedback(fdb.MemberID)}>
            Delete
        </Button>

        <EditFeedbackModal show={this.state.editModalShow}
        onHide={editModalClose}
        fdbmemid={fdbmemid}
        fdbmemname={fdbmemname}
        fdbtitle={fdbtitle}
        fdbtext={fdbtext}
        fdbrating={fdbrating}
       
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Return Book</Button>

                    <AddFeedbackModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}