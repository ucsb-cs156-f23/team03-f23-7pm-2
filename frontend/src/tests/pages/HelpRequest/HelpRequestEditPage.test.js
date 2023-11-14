import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HelpRequestEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("HelpRequestEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/helprequests", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit HelpRequest");
            expect(screen.queryByTestId("HelpRequest-name")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/helprequests", { params: { id: 17 } }).reply(200, {
                id: 17,
                requesterEmail: "chrisgaucho@ucsb.edu",
                teamId: "team01",
                tableOrBreakoutRoom: "table",
                requestTime: "2023-11-04T21:31:01",
                explanation: "Need help with dokku deployment",
                solved: "true"
            });
            axiosMock.onPut('/api/helprequests').reply(200, {
                id: 17,
                requesterEmail: "christinagaucho@ucsb.edu",
                teamId: "team02",
                tableOrBreakoutRoom: "breakout room",
                requestTime: "2023-12-04T21:31:01",
                explanation: "Felt quirky",
                solved: "false"
            });
        });

        const queryClient = new QueryClient();
    
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("HelpRequestForm-id");

            const idField = screen.getByTestId("HelpRequestForm-id");
            const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
            const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
            const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestForm-tableOrBreakoutRoom");
            const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
            const explanationField = screen.getByTestId("HelpRequestForm-explanation");
            const solvedField = screen.getByTestId("HelpRequestForm-solved");
            const submitButton = screen.getByTestId("HelpRequestForm-submit");

            expect(idField).toBeInTheDocument();
            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toBeInTheDocument();
            expect(requesterEmailField).toHaveValue("chrisgaucho@ucsb.edu");
            expect(teamIdField).toBeInTheDocument();
            expect(teamIdField).toHaveValue("team01");
            expect(tableOrBreakoutRoomField).toBeInTheDocument();
            expect(tableOrBreakoutRoomField).toHaveValue("table");
            expect(requestTimeField).toBeInTheDocument();
            expect(requestTimeField).toHaveValue("2023-11-04T21:31:01.000");
            expect(explanationField).toBeInTheDocument();
            expect(explanationField).toHaveValue("Need help with dokku deployment");
            expect(solvedField).toBeInTheDocument();
            expect(solvedField).toHaveValue("true");

            expect(submitButton).toHaveTextContent("Update");

            fireEvent.change(requesterEmailField, { target: { value: 'christinagaucho@ucsb.edu' } });
            fireEvent.change(teamIdField, { target: { value: 'team02' } });
            fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'breakout room' } });
            fireEvent.change(requestTimeField, { target: { value: '2023-12-04T21:31:01' } });
            fireEvent.change(explanationField, { target: { value: 'Felt quirky' } });
            fireEvent.change(solvedField, { target: { value: 'false' } });
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("HelpRequest Updated - id: 17 requesterEmail: christinagaucho@ucsb.edu");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/helprequests" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                requesterEmail: "christinagaucho@ucsb.edu",
                teamId: "team02",
                tableOrBreakoutRoom: "breakout room",
                requestTime: "2023-12-04T21:31:01.000",
                explanation: "Felt quirky",
                solved: "false"
            })); // posted object


        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <HelpRequestEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("HelpRequestForm-id");

            const idField = screen.getByTestId("HelpRequestForm-id");
            const requesterEmailField = screen.getByTestId("HelpRequestForm-requesterEmail");
            const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
            const tableOrBreakoutRoomField = screen.getByTestId("HelpRequestForm-tableOrBreakoutRoom");
            const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
            const explanationField = screen.getByTestId("HelpRequestForm-explanation");
            const solvedField = screen.getByTestId("HelpRequestForm-solved");
            const submitButton = screen.getByTestId("HelpRequestForm-submit");

            expect(idField).toHaveValue("17");
            expect(requesterEmailField).toBeInTheDocument();
            expect(requesterEmailField).toHaveValue("chrisgaucho@ucsb.edu");
            expect(teamIdField).toBeInTheDocument();
            expect(teamIdField).toHaveValue("team01");
            expect(tableOrBreakoutRoomField).toBeInTheDocument();
            expect(tableOrBreakoutRoomField).toHaveValue("table");
            expect(requestTimeField).toBeInTheDocument();
            expect(requestTimeField).toHaveValue("2023-11-04T21:31:01.000");
            expect(explanationField).toBeInTheDocument();
            expect(explanationField).toHaveValue("Need help with dokku deployment");
            expect(solvedField).toBeInTheDocument();
            expect(solvedField).toHaveValue("true");

            fireEvent.change(requesterEmailField, { target: { value: 'christinagaucho@ucsb.edu' } });
            expect(requesterEmailField).toHaveValue("christinagaucho@ucsb.edu");
            fireEvent.change(teamIdField, { target: { value: 'team02' } });
            expect(teamIdField).toHaveValue("team02");
            fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'breakout room' } });
            expect(tableOrBreakoutRoomField).toHaveValue("breakout room");
            fireEvent.change(requestTimeField, { target: { value: '2023-12-04T21:31:01' } });
            expect(requestTimeField).toHaveValue("2023-12-04T21:31:01.000");
            fireEvent.change(explanationField, { target: { value: 'Felt quirky' } });
            expect(explanationField).toHaveValue("Felt quirky");
            fireEvent.change(solvedField, { target: { value: 'false' } });
            expect(solvedField).toHaveValue("false");

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("HelpRequest Updated - id: 17 requesterEmail: christinagaucho@ucsb.edu");
            expect(mockNavigate).toBeCalledWith({ "to": "/helprequests" });
        });

       
    });
});