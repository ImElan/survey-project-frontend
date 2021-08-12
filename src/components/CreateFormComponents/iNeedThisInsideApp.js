import React, { useState } from 'react';

const iNeedThisInsideApp = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div >

            <Pagination
                questionsPerPage={questionsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
};

export default iNeedThisInsideApp;
