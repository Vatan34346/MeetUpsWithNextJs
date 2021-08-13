import {useRouter} from 'next/router'
import {Fragment} from 'react'
import Head from 'next/head'
import MeetUpForm from "../../components/meetups/NewMeetupForm";

const NewMeetUp = () => {
 const router= useRouter();
  const addMeetUpHandler = async (enteredData) => {
   const respponse =await fetch('/api/newMeetUp',{
     method:'POST',
     body:JSON.stringify(enteredData),
     headers:{
       'Content-Type':'application/json'
     }
   });

   const data =await respponse.json();

   router.push('/');
  };

  return (
    <Fragment>
      <Head>
      <title>Add a New Meetup</title>
      <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities.'
        />
      </Head>
  <MeetUpForm onAddMeetup={addMeetUpHandler} />
  </Fragment>
  );
};

export default NewMeetUp;
