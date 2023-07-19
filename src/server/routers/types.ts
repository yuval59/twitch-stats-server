export type JwtParams = {
  id: string
  username: string
  role: {
    name: string
    level: number
  }
}

export type ResJsonParams = {
  id: string
  email: string
  username: string

  role: {
    name: string
    level: number
  }
}
