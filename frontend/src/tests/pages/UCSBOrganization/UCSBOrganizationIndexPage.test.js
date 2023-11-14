import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UCSBOrganizationIndexPage from "main/pages/UCSBOrganization/UCSBOrganizationIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
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

describe("UCSBOrganizationIndexPage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "UCSBOrganizationTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const queryClient = new QueryClient();
    
    test("Renders with Create Button for admin user", async () => {
        setupAdminUser();
        axiosMock.onGet("/api/ucsborganization/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Create UCSB Organization/)).toBeInTheDocument();
        });
        const button = screen.getByText(/Create UCSB Organization/);
        expect(button).toHaveAttribute("href", "/ucsborganization/create");
        expect(button).toHaveAttribute("style", "float: right;");
    });

    test("renders three ucsb organizations correctly for regular user", async () => {
        setupUserOnly();
        axiosMock.onGet("/api/ucsborganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("MD"); });
        expect(screen.getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent("PEE");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-orgCode`)).toHaveTextContent("KUM");

        expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent("Mu Delta");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslation`)).toHaveTextContent("Mu Delta");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-Inactive`)).toHaveTextContent("true");

        // for non-admin users, details button is visible, but the edit and delete buttons should not be visible
        expect(screen.queryByText(/Create UCSB Organization/)).not.toBeInTheDocument();
        expect(screen.queryByTestId("UCSBOrganizationTable-cell-row-0-col-Delete-button")).not.toBeInTheDocument();
        expect(screen.queryByTestId("UCSBOrganizationTable-cell-row-0-col-Edit-button")).not.toBeInTheDocument();
    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        axiosMock.onGet("/api/ucsborganization/all").timeout();

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        
        const errorMessage = console.error.mock.calls[0][0];
        expect(errorMessage).toMatch("Error communicating with backend via GET on /api/ucsborganization/all");
        restoreConsole();
    });

    test("what happens when you click delete, admin", async () => {
        setupAdminUser();

        axiosMock.onGet("/api/ucsborganization/all").reply(200, ucsbOrganizationFixtures.threeOrganizations);
        axiosMock.onDelete("/api/ucsborganization").reply(200, "UCSB Organization with orgCode MD was deleted");

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBOrganizationIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toBeInTheDocument(); });
        expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent("MD");

        const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("UCSB Organization with orgCode MD was deleted") });

        await waitFor(() => { expect(axiosMock.history.delete.length).toBe(1); });
        expect(axiosMock.history.delete[0].url).toBe("/api/ucsborganization");
        expect(axiosMock.history.delete[0].url).toBe("/api/ucsborganization");
        expect(axiosMock.history.delete[0].params).toEqual({ orgCode: "MD" });
    });

});