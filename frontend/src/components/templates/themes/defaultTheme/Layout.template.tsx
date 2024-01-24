import { FC } from 'react'
import { MainLayoutPropsType } from 'types/ui'

import { GolemLogoWithDescription } from 'components/atoms/icons/GolemLogoWithDescription'
import { Grid } from 'components/organisms/grid/Grid'

import React from 'react'
import { Footer } from './Footer'

export const LayoutTemplate: FC<MainLayoutPropsType> = ({ header, main }) => {
  return (
    <div>
      <div
        className="mb-24"
        style={{
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        <Grid className="mt-1 ">
          <div className="col-span-12 grid grid-cols-12">
            <div className="xl:col-span-2 col-span-4 mt-8">
              <GolemLogoWithDescription />
            </div>
            <div className="col-span-5 xl:col-span-8"></div>
            <div className="col-span-3 xl:col-span-2">{header}</div>
          </div>
          {main}
        </Grid>
      </div>
      <div>
        {/* <Grid className="">
          <Footer></Footer>
        </Grid> */}
      </div>
    </div>
  )
}
