import React from 'react'
import CategoryList from './_components/CategoryList'

function layout({children}) {
  return (
    <div className='grid grid-cols-3'>
        


        <div className='hidden md:block'>
          {/* category list */}
          <CategoryList />
        </div>

        <div className='col-span-2 md:col-3 '>

          {children}

        </div>
       
        </div>
  )
}

export default layout