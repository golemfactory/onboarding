import { FC } from 'react'
import { LayoutPropsType } from 'types/ui'

import style from './Layout.module.css'
import { GolemLogoWithDescription } from 'components/atoms/icons/GolemLogoWithDescription'
import { Grid } from 'components/organisms/grid/Grid'
import { Button } from 'components/atoms/button'
import { Trans } from 'components/atoms/translation'

const Ellipses = () => {
  return (
    <div>
      {/* <div className={style.ellipse_1}></div>
      <div className={style.ellipse_2}></div>
      <div className={style.ellipse_3}></div> */}
    </div>
  )
}

export const LayoutTemplate: FC<LayoutPropsType> = ({ header, main }) => {
  return (
    <main
      style={{
        width: '100%',
        position: 'absolute',
      }}
    >
      <Grid className="mt-10 ">
        <Ellipses />
        <div className="col-span-12 grid grid-cols-12">
          <div className="xl:col-span-2 col-span-4">
            <GolemLogoWithDescription />
          </div>
          <div className="col-span-5 xl:col-span-8"></div>
          <div className="col-span-3 xl:col-span-2">{header}</div>
        </div>
        {main}
      </Grid>
    </main>
  )
}
