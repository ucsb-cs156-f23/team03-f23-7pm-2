import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import UCSBDiningCommonsMenuItemCreatePage
    from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemCreatePage";
import {QueryClient, QueryClientProvider} from "react-query";
import {MemoryRouter} from "react-router-dom";

import {apiCurrentUserFixtures} from "fixtures/currentUserFixtures";
import {systemInfoFixtures} from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

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
        Navigate: (x) => {
            mockNavigate(x);
            return null;
        }
    };
});
describe("UCSBDiningCommonsMenuItemCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDiningCommonsMenuItemCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("on submit, makes request to backend, and redirects to /ucsbdiningcommonsmenuitem", async () => {

        const queryClient = new QueryClient();
        const ucsbDiningCommonsMenuItem = {
            id: 1,
            diningCommonsCode: "ortega",
            name: "Baked Pesto Pasta with Chicken",
            station: "Entree Specials"
        };

        axiosMock.onPost("/api/ucsbdiningcommonsmenuitem/post").reply(202, ucsbDiningCommonsMenuItem);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDiningCommonsMenuItemCreatePage/>
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode")).toBeInTheDocument();
        });

        const diningCommonsCodeField = screen.getByLabelText("Dining Commons Code");
        const nameField = screen.getByLabelText("Name");
        const stationField = screen.getByLabelText("Station");
        const createButton = screen.getByText("Create");

        expect(diningCommonsCodeField).toBeInTheDocument();
        expect(nameField).toBeInTheDocument();
        expect(stationField).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();

        fireEvent.change(diningCommonsCodeField, {target: {value: 'ortega'}});
        fireEvent.change(nameField, {target: {value: 'Baked Pesto Pasta with Chicken'}});
        fireEvent.change(stationField, {target: {value: 'Entree Specials'}});
        fireEvent.click(createButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            diningCommonsCode: "ortega",
            name: "Baked Pesto Pasta with Chicken",
            station: "Entree Specials"
        });

        // assert
        expect(mockToast).toBeCalledWith("New UCSB Dining Commons Menu Item Created - id: 1 name: Baked Pesto Pasta with Chicken");
        expect(mockNavigate).toBeCalledWith({"to": "/ucsbdiningcommonsmenuitem"});
    });
});
