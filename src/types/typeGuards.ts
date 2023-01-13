import { CpuProduct, Product, User } from './appType';

export function isUser(user: any): user is User {
  return (user as User) !== undefined;
}

export function isProduct(product: any): product is Product {
  return (product as Product) !== undefined;
}

export function isCpu(cpu: any): cpu is CpuProduct {
  return (cpu as CpuProduct) !== undefined;
}
