import React,{useState,useEffect} from 'react';
import { Button, Carousel, Image, Container } from 'react-bootstrap';
import img1 from './HomeImg/download.png';
import img2 from './HomeImg/2.png';
import img3 from './HomeImg/images.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const getAppliedName = localStorage.getItem('AppliedName');
  const getAppliedMail = localStorage.getItem('AppliedMail');

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className='text-center mt-2'>Welcome to Reva Nest</h1>
      <Carousel>
        <Carousel.Item>
          <Image className="d-block mx-auto w-75" src={img3} fluid />
          <Carousel.Caption>
            <h3 className='text-warning'>Core Teams</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block mx-auto w-75" src={img2} fluid />
          <Carousel.Caption>
            <h3 className='text-warning'>Technology Department</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image className="d-block mx-auto w-75" src={img1} fluid />
          <Carousel.Caption>
            <h3 className='text-warning'>Other Department</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <hr />
      <hr />
      {getAppliedName && getAppliedMail ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
          <Button className='text-center'>
            <Link style={{ color: 'white', textDecoration: 'none' }} to={'/bookingSlot'}>
              Book Your Seat
            </Link>
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Home;
