import { useLocation, useNavigate } from 'react-router-dom'


export const usePathname = () => {
  const location = useLocation()
  return location.pathname
}

export const useRouter = () => {
  const navigate = useNavigate()

  const push = (path: string) => {
    navigate(path)
  }

  const replace = (path: string) => {
    navigate(path, { replace: true })
  }

  const back = () => {
    navigate(-1)
  }

  return {
    push,
    replace,
    back
  }
}