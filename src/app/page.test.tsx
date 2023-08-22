import GuestInput from "./components/guest-input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("GuestInput", () => {
    it("Can change input value", () => {
        const expectedValue = 0;
        const handleGuestInput = jest.fn();
        render(<GuestInput handleGuestInput={handleGuestInput} guests={expectedValue} />);
        const input = screen.getByTestId("guest-input")
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(expectedValue.toString());

        const newValue = 1;
        fireEvent.change(input, { target: { value: newValue } });
        expect(input).toHaveValue(newValue.toString());

        fireEvent.change(input, { target: { value: expectedValue } });
        expect(input).toHaveValue(expectedValue.toString());
    });

    it("Can render buttons on input", () => {
        const expectedValue = 0;
        const handleGuestInput = jest.fn();
        render(<GuestInput handleGuestInput={handleGuestInput} guests={expectedValue} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons[0]).toBeInTheDocument();
        expect(buttons[1]).toBeInTheDocument();

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
    });
});