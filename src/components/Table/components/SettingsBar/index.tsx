/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */

import React, { ReactNode } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import SettingsPopover from '../SettingsPopover';

export interface SettingsBarProps {
    pageIndex: number;
    pageSize: number;
    pageSizes: number[];
    pageLength: number;
    rowCount: number;
    totalCount: number;
    disablePagination?: boolean;
    disableSettings?: boolean;
    disableGroupBy?: boolean;
    loading?: boolean;
    gotoPage?: (pageIndex: number) => void;
    previousPage?: () => void;
    canPreviousPage?: boolean;
    nextPage?: () => void;
    canNextPage?: boolean;
    setPageSize?: (size: number) => void;
    styles: {
        leftSpace: string;
        verticalGrid: string;
    };
    columnsGroupingComponent: ReactNode;
    columnsSelectorComponent: ReactNode;
}

export default function SettingBar({
    pageIndex,
    pageSize,
    pageSizes,
    pageLength,
    loading,
    rowCount,
    totalCount,
    disablePagination,
    disableSettings,
    disableGroupBy = false,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    styles,
    columnsGroupingComponent,
    columnsSelectorComponent,
    canPreviousPage = false,
    canNextPage = false,
}: SettingsBarProps) {
    const [settingsAnchor, setSettingsAnchor] = React.useState<HTMLButtonElement | null>(null);
    const handleSettingsClick = (event: React.MouseEvent<any, MouseEvent>) => {
        setSettingsAnchor(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setSettingsAnchor(null);
    };

    const settingsOpen = Boolean(settingsAnchor);
    const settingsId = settingsOpen ? 'settings-popover' : undefined;

    const settingsPopoverProps = {
        pageSize,
        pageSizes,
        settingsId,
        loading,
        settingsOpen,
        disableGroupBy,
        gotoPage,
        settingsAnchor,
        handleSettingsClose,
        setPageSize,
        styles,
        columnsGroupingComponent,
        columnsSelectorComponent,
    };

    if (!(disablePagination && disableSettings)) {
        return (
            <div>
                {!disablePagination && (
                    <>
                        <IconButton
                            size="small"
                            aria-label="first page"
                            disabled={pageIndex === 0 || loading}
                            data-testid="first-page"
                            onClick={() => gotoPage?.(0)}
                        >
                            <FirstPage />
                        </IconButton>
                        <IconButton
                            size="small"
                            aria-label="previous page"
                            disabled={!canPreviousPage || loading}
                            data-testid="previous-page"
                            onClick={previousPage}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <span>{`${pageIndex * pageSize + 1}-${
                            pageIndex * pageSize + pageLength
                        } of ${totalCount}`}</span>
                        <IconButton
                            aria-label="next page"
                            size="small"
                            disabled={!canNextPage || loading}
                            data-testid="next-page"
                            onClick={nextPage}
                        >
                            <NavigateNext />
                        </IconButton>
                        <IconButton
                            aria-label="last page"
                            size="small"
                            data-testid="last-page"
                            disabled={pageIndex! * pageSize + pageLength >= rowCount || loading}
                            onClick={() => gotoPage?.(Math.ceil(rowCount / pageSize) - 1)}
                        >
                            <LastPage />
                        </IconButton>
                    </>
                )}
                {!disableSettings && (
                    <>
                        <IconButton
                            size="small"
                            aria-label="settings"
                            className={styles.leftSpace}
                            aria-describedby={settingsId}
                            disabled={loading}
                            data-testid="settings"
                            onClick={handleSettingsClick}
                        >
                            <SettingsOutlined fontSize="small" />
                        </IconButton>
                        <SettingsPopover {...settingsPopoverProps} />
                    </>
                )}
            </div>
        );
    }

    return null;
}
