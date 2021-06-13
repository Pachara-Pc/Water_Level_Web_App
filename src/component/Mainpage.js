
import { Card,Col, Row,Button ,Modal,Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Mainpage( prop) {

   

    return prop.tank.map(e =>   
        
            
        
       
        <Card style={{ width: '18rem' ,margin:'0px 20px 0px 0px' }}>
       
        
        <Card.Body>
          <Card.Title>{e.name}</Card.Title>
          
          <Link to={`/showTank/${e.id}`}><Button>เข้าดู</Button></Link>
        </Card.Body>
      
      </Card>
      

   ) 
}



export default Mainpage

