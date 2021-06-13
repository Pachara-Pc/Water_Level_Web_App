import { Card, Row,Button ,Modal,Form} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Markup } from 'interweave';
import firebase from 'firebase';
import { firebaseConfig} from '../config'

firebase.initializeApp(firebaseConfig)


const Realtime = () => {
    const date = new Date()
  
    return `${date.getHours().toString().padStart(2,0)}:${date.getMinutes().toString().padStart(2,0)}:${date.getSeconds().toString().padStart(2,0)}`
  
  }
  const ShowDate = () =>{
    const date = new Date()
  
    return `${date.getDate().toString().padStart(2,0)}/${date.getMonth().toString().padStart(2,0)}/${(date.getFullYear()+543).toString().padStart(2,0)}`
  }

function Tank( ) {


    const [Titletank,setTitletank] = useState(0)
    const [Waterlevel,setWaterlevel] = useState(0)
    const [Time, setTime] = useState(Realtime())
    const [Newname,setNewname] = useState(Titletank)
    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(() => {
  
      setInterval(() => {
  
  
        setTime(Realtime())
        
      }, 1000)
      
      getData()
  
    }, [])
  
    const getData = () => {
    
      var database = firebase.database().ref('Sensores').child('sensor1')
      database.on('value',snap =>{
        setWaterlevel(snap.val())
        console.log(snap.val());
      })
        // console.log(database);
      }

  const Level = (num) =>{
  
    const text= '<div class="absolute"></div>'
    
      return text.repeat(num)
  }
  
  const recomment =( text)=>{
    if(text === 0){
      return `น้ำหมด กรุณาเติมน้ำ`
    }
    else if(text === 1){
      return `น้ำอยู่ในระดับน้อยมาก กรุณาเติมน้ำ`
    }else if(text === 2){
      return `น้ำอยู่ในระดับน้อย อย่าลืมเติมน้ำ`
  
    }else if(text === 3){
      return `น้ำอยู่ในระดับปานกลาง`
    }else if(text === 4){
      return `น้ำอยู่ในระดับสูง`
    }else if(text === 5){
      return `น้ำเต็มถัง`
    }else{
    
    }
  
  }
  
    const RenderWaterTank = () =>{
    
 
        return    <Card style={{margin: '10px 0px 0px 0px'}}>
  
            <Card.Body>
               
                  

            <h1>วันที่ {ShowDate()}       </h1>
            
           
            <h4>เวลา {Time} </h4>
              <Card.Title style={{ textAlign: 'center' }} >
                 {Titletank} 
                 <Button variant="primary" onClick={handleShow} style={{margin:'0px 0px 0px 10px'} }>
          edit
        </Button>
                {/* <Button onClick={}>Edit</Button> */}
            
              </Card.Title>
              <div class="relative" >
              
  
                <Markup content={Level(Waterlevel)} />
              </div>
              <Card.Subtitle className="mb-2 text-muted"><h2>รายละเอียด</h2></Card.Subtitle>
              <Card.Text>
                ระดับน้ำในถัง : {Waterlevel}
              
            </Card.Text>
  
            <Card.Text>
            
             {recomment(Waterlevel)}
            </Card.Text>
  
            </Card.Body>
              
          </Card>
       
         
    }

    return(
        <div >
    
      <Row className="justify-content-center" sm={2} xs={1} >
        {/* {console.log(props.tank[params.id-1])} */}
            {RenderWaterTank()}
      </Row>
     
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขชื่อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control size="lg" type="text"  onChange={e => setNewname(e.target.value)}  />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{setTitletank(Newname); handleClose(); }} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* {getData()} */}
    </div>

    )
}



export default Tank

