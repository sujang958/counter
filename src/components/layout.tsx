import { FC } from "react";

const BaseLayout: FC<{children: any}> = ({children}) => {
  return (
    <div className="font-pretendard">{children}</div>
  )
}

export default BaseLayout