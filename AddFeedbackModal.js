import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddFeedbackModal extends Component{
    constructor(props){
        super(props);
        this.state={fdbs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Feedback')
        .then(response=>response.json())
        .then(data=>{
            this.setState({fdbs:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Feedback',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
             
                MemberName:event.target.MemberName.value,
                FeedbackTitle:event.target.FeedbackTitle.value,
                FeedbackText:event.target.FeedbackText.value,
                Rating:event.target.Rating.value,
               

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Feedback/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Return Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="MemberName">
                        <Form.Label>MemberName</Form.Label>
                        <Form.Control type="text" name="MemberName" required 
                        placeholder="MemberName"/>
                    </Form.Group>

                    <Form.Group controlId="FeedbackTitle">
                        <Form.Label>FeedbackTitle</Form.Label>
                        <Form.Control type="text" name="FeedbackTitle" required 
                        placeholder="FeedbackTitle"/>
                    </Form.Group>

                    <Form.Group controlId="FeedbackText">
                        <Form.Label>FeedbackText</Form.Label>
                        <Form.Control type="text" name="FeedbackText" required 
                        placeholder="FeedbackText"/>
                    </Form.Group>

                    <Form.Group controlId="Rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="Rating" required 
                        placeholder="Rating"/>
                    </Form.Group>


                   

                    <Form.Group>
                        <Button variant="primary" type="submit">
                           Return Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}