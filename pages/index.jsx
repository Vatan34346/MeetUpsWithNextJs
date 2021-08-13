import {Fragment} from 'react'
import Head from 'next/head'
import {MongoClient} from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";


const HomePage = (props) => {




  return (
    <Fragment>
      <Head>
        <title>React Meet Ups</title>
        <meta  name='starting page' content='all meet ups are shown here'/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};


// export async function getServerSideProps(contex){// rerender for ewvry reqest

// const req=contex.req;
// const res =contex.res;


//   return{
//     props:{
//       meetups:DUMMY_DATA
//     }
//   }
// }

export  async function getStaticProps(){

// can fetch ddata from API
const client= await MongoClient.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
const db = client.db("MeetUps");
const meetUpCollections = db.collection("MeetUps");

const meetUps=await meetUpCollections.find().toArray();

 client.close();
  return{
    props:{
        meetups:meetUps.map(item=>({
          image:item.data.image,
          title:item.data.title,
          address:item.data.address,
          id:item._id.toString()
        }))
    },
    revalidate:1// REGENARATE ON THE SERVER AFTER DEPLOYEMNT
  };
}

export default HomePage;
