import { FC } from 'react'
import { LayoutPropsType } from 'types/ui'

import style from './Layout.module.css'
import { GolemLogoWithDescription } from 'components/atoms/icons/GolemLogoWithDescription'
import { Grid } from 'components/organisms/grid/Grid'
import gridStyle from 'components/organisms/grid/Grid.module.css'
import { Button } from 'components/atoms/button'
import { Trans } from 'components/atoms/translation'

const Ellipses = () => {
  return (
    <div>
      <div className={style.ellipse_1}></div>
      <div className={style.ellipse_2}></div>
      <div className={style.ellipse_3}></div>
    </div>
  )
}

export const LayoutTemplate: FC<LayoutPropsType> = ({ header, main }) => {
  return (
    <main>
      {/* <div className={style.container}>
        <div className={style.header}>
          <GolemLogoWithDescription />
          {header}
        </div>
        <div className={style.content}>{main}</div>
      </div> */}
      <Grid className="mt-10 ">
        {/* <Ellipses /> */}
        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-2">
            <GolemLogoWithDescription />
          </div>
          <div className="col-span-1 md:col-span-5 xl:col-span-9"></div>
          <div className="col-span-1">
            <Button buttonStyle="solid">
              <Trans i18nKey="readMore" ns="landing" />
            </Button>
          </div>
        </div>

        {main}
      </Grid>
    </main>
  )
}
