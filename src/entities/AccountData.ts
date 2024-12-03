import { AccountMark } from "./AccountMark"
import { AccountType } from "./AccountType"

export interface AccountData {
  readonly id: number
  readonly mark: AccountMark[]
  readonly accountType: AccountType
  readonly login: string
  readonly password: string | null
}
