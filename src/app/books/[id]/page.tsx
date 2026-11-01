import React from 'react';

const BookDetailsPage = async({params}) => {
   
  const {id} = await params;

   console.log(id);
    return (
        <div>
            BookDetailsPage
        </div>
    );
};

export default BookDetailsPage;