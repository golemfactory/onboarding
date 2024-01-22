import { FC } from 'react'
import { MainLayoutPropsType } from 'types/ui'

import { GolemLogoWithDescription } from 'components/atoms/icons/GolemLogoWithDescription'
import { Grid } from 'components/organisms/grid/Grid'

import React from 'react'
import { Footer } from './Footer'

export const LayoutTemplate: FC<MainLayoutPropsType> = ({
  header,
  main,
  background,
}) => {
  return (
    <main
      // style={{
      //   width: '100%',
      //   position: 'absolute',
      // }}
      style={{
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      <Grid className="mt-1">
        {background}
        <div className="col-span-12 grid grid-cols-12">
          <div className="xl:col-span-2 col-span-4">
            <GolemLogoWithDescription />
          </div>
          <div className="col-span-5 xl:col-span-8"></div>
          <div className="col-span-3 xl:col-span-2">{header}</div>
        </div>
        {main}
        <Footer />
      </Grid>
    </main>
  )
}
