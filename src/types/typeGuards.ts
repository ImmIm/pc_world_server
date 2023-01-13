import { Category, CategoryName, CpuProduct, Product, User } from './appType';

export function isUser(user: any): user is User {
  return (user as User) !== undefined;
}

export function isProduct(product: any): product is Product {
  return (product as Product) !== undefined;
}

export function isCpu(cpu: any): cpu is CpuProduct {
  return (cpu as CpuProduct) !== undefined;
}

export function isCategoryNameArray(names: any): names is CategoryName[] {
  return (names as CategoryName[]) !== undefined;
}

export function isCategoryArray(arr: any): arr is Category[] {
  return (arr as Category[]) !== undefined;
}

export function isString(string: any): string is string {
  return (string as string) !== undefined;
}

