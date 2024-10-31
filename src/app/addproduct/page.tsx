import React, { Suspense } from 'react';

// Dynamically import AddProduct2 using React.lazy
const AddProduct2 = React.lazy(() => import('@/components/default/AddProduct2'));

const AddProductPage2 = () => {
    return (
        <div>
            {/* Suspense with a fallback (LoadingSpinner) */}
            <Suspense fallback={<div></div> }>
                <AddProduct2 />
            </Suspense>
        </div>
    );
};

export default AddProductPage2;
