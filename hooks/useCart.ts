"use client";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/cartAtoms';

export function useCart() {
  const [cartValue, setCartValue] = useRecoilState(cartState);

  useEffect(() => {
    const storedValue = localStorage.getItem('cartValue');
    if (storedValue !== null) {
      setCartValue(parseInt(storedValue, 10));
    }
  }, [setCartValue]);

  const updateCart = (newValue: number) => {
    setCartValue(newValue);
    localStorage.setItem('cartValue', newValue.toString());
  };

  return { cartValue, updateCart };
}
