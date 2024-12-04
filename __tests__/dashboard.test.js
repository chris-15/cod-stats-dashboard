import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChooseDashboard from "@/app/dashboard/page";
import * as NextAuth from  "next-auth/next";
import { redirect } from "next/navigation";


// Mock the entire next-auth module
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn()
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

describe("Choose Dashboard" , ()=>{
    it("renders without crashing", () => {
        render(<ChooseDashboard />);
      });
})