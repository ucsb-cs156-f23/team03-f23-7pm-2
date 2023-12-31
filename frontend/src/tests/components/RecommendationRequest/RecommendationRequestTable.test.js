import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import RecommendationRequestTable from "main/components/RecommendationRequest/RecommendationRequestTable"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UserTable tests", () => {
    const queryClient = new QueryClient();

    test("Has the expected column headers and content for ordinary user", () => {

        const currentUser = recommendationRequestFixtures.userOnly;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestTable recommendationrequests={recommendationRequestFixtures.threeRecommendation} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );

        const expectedHeaders = ["Id", "RequesterEmail", "ProfessorEmail", "Explanation", "DateRequested", "DateNeeded", "Done"];
        const expectedFields = ["id", "requesterEmail", "professorEmail", "explanation", "dateRequested", "dateNeeded", "Done"];
        const testId = "RecommendationRequestTable";

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach((field) => {
            const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
            expect(header).toBeInTheDocument();
        });

        expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-requesterEmail`)).toHaveTextContent("requesterEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-professorEmail`)).toHaveTextContent("professorEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-explanation`)).toHaveTextContent("explanation1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateRequested`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateNeeded`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-Done`)).toHaveTextContent("false");
        
        expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-requesterEmail`)).toHaveTextContent("requesterEmail2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-professorEmail`)).toHaveTextContent("professorEmail2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-explanation`)).toHaveTextContent("explanation2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-dateRequested`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-dateNeeded`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-Done`)).toHaveTextContent("false");
        
        expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");

        const editButton = screen.queryByTestId(`${testId}-cell-row-0-col-Edit-button`);
        expect(editButton).not.toBeInTheDocument();

        const deleteButton = screen.queryByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).not.toBeInTheDocument();

    });

    test("Has the expected colum headers and content for adminUser", () => {

        const currentUser = currentUserFixtures.adminUser;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestTable recommendationrequests={recommendationRequestFixtures.threeRecommendation} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );

        const expectedHeaders = ["Id", "RequesterEmail", "ProfessorEmail", "Explanation", "DateRequested", "DateNeeded", "Done"];
        const expectedFields = ["id", "requesterEmail", "professorEmail", "explanation", "dateRequested", "dateNeeded", "Done"];
        const testId = "RecommendationRequestTable";

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expectedFields.forEach((field) => {
            const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
            expect(header).toBeInTheDocument();
        });

        expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-requesterEmail`)).toHaveTextContent("requesterEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-professorEmail`)).toHaveTextContent("professorEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-explanation`)).toHaveTextContent("explanation1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateRequested`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateNeeded`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-Done`)).toHaveTextContent("false");

        expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-requesterEmail`)).toHaveTextContent("requesterEmail2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-professorEmail`)).toHaveTextContent("professorEmail2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-explanation`)).toHaveTextContent("explanation2");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-dateRequested`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-dateNeeded`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-1-col-Done`)).toHaveTextContent("false");

        const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
        expect(editButton).toBeInTheDocument();
        expect(editButton).toHaveClass("btn-primary");

        const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveClass("btn-danger");

    });

    test("Edit button navigates to the edit page for admin user", async () => {

        const currentUser = currentUserFixtures.adminUser;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestTable recommendationrequests={recommendationRequestFixtures.threeRecommendation} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>

        );

        await waitFor(() => { expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-id`)).toHaveTextContent("1"); });
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-requesterEmail`)).toHaveTextContent("requesterEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-professorEmail`)).toHaveTextContent("professorEmail1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-explanation`)).toHaveTextContent("explanation1");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateRequested`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-dateNeeded`)).toHaveTextContent("2023-11-02T00:00:00");
        expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-Done`)).toHaveTextContent("false");


        const editButton = screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-Edit-button`);
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/recommendationrequest/edit/1'));


    });

    test("Delete button calls delete callback", async () => {
        const currentUser = currentUserFixtures.adminUser;

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <RecommendationRequestTable recommendationrequests={recommendationRequestFixtures.threeRecommendation} currentUser={currentUser} />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

        const deleteButton = screen.getByTestId(`RecommendationRequestTable-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);
    });

});
