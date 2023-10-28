import { Card } from 'react-bootstrap'

function CardImage({ img_src, img_alt }) {
    return (
        // <div className="card-image">
        //     <img alt={img_alt} src={img_src} width="220" height="200"/>
        //     <div className="block-ellipsis">
        //         {img_alt}
        //     </div>
        // </div>
        <Card key={img_alt} bg='light' className='card-image'>
            <Card.Img variant="top" src={img_src} alt={img_alt} />
            <Card.Body>
                <div className="block-ellipsis">
                    {img_alt}
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardImage;
