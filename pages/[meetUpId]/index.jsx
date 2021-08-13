import {Fragment} from 'react'
import Head from 'next/head'
import { MongoClient,ObjectId } from "mongodb";
import MeetUpDet from "../../components/meetups/MeetUpDetail";

const MeetUpDatail = (props) => {
  return (
   <Fragment>]

     <Head>
       <title>props.meetupData.title</title>
       <meta name='description' content={props.meetupData.description} />
       </Head>
      <MeetUpDet
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
   </Fragment>
  );
};

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
  );

  const db = client.db();

  const meetCollection = db.collection("MeetUps");

  const data = await meetCollection.find({},{_id:1}).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: data.map((item) => ({
      params: { meetUpId: item._id.toString() },
    })),
  };
}



export async function getStaticProps(context) {
 const meetupId =context.params.meetUpId;

 const client = await MongoClient.connect(
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
);

const db = client.db("MeetUps");

const meetCollection = db.collection("MeetUps");

const selectOneMeetUp = await meetCollection.findOne({_id:ObjectId(meetupId)});
client.close();

return{
  props:{
    meetupData:{
      id:selectOneMeetUp._id.toString(),
      image:selectOneMeetUp.data.image,
      title:selectOneMeetUp.data.title,
      address:selectOneMeetUp.data.address,
      description:selectOneMeetUp.data.description
    }
    
  
  }
}
 
}

export default MeetUpDatail;
