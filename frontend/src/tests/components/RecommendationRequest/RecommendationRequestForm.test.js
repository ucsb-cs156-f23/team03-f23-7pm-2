import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("RecommendationRequestForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Requester Email/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a Recommendation ", async () => {

        const { getByText, getByTestId } = render(
            <Router>
                <RecommendationRequestForm initialRecommendation={recommendationRequestFixtures.oneRecommendation} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/RecommendationRequestForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/RecommendationRequestForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationRequestForm-submit")).toBeInTheDocument());
        const dateRequestedField = getByTestId("RecommendationRequestForm-dateRequested");
        const submitButton = getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(dateRequestedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/dateRequested is required./)).toBeInTheDocument());
        expect(getByText(/dateRequested is required./)).toBeInTheDocument();
    });

    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationRequestForm-submit")).toBeInTheDocument());
        const dateNeededField = getByTestId("RecommendationRequestForm-dateNeeded");
        const submitButton = getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(dateNeededField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/dateNeeded is required./)).toBeInTheDocument());
        expect(getByText(/dateNeeded is required./)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationRequestForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("RecommendationRequestForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/requesterEmail is required./)).toBeInTheDocument());
        expect(getByText(/professorEmail is required./)).toBeInTheDocument();
        expect(getByText(/explanation is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <RecommendationRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationRequestForm-requesterEmail")).toBeInTheDocument());

        const requesterEmailField = getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = getByTestId("RecommendationRequestForm-professorEmail");
        const explanationField = getByTestId("RecommendationRequestForm-explanation");
        const dateRequestedField = getByTestId("RecommendationRequestForm-dateRequested");
        const dateNeededField = getByTestId("RecommendationRequestForm-dateNeeded");
        const doneField = getByTestId("RecommendationRequestForm-done");
        const submitButton = getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'req@email.com' } });
        fireEvent.change(professorEmailField, { target: { value: 'prof@email.com' } });
        fireEvent.change(explanationField, { target: { value: 'explain' } });
        fireEvent.change(dateRequestedField, { target: { value: '2023-01-01T12:00' } });
        fireEvent.change(dateNeededField, { target: { value: '2023-01-01T12:00' } });
        fireEvent.change(doneField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/dateRequested must be in ISO format/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("RecommendationRequestForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("RecommendationRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});

