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
import React, { Suspense } from 'react';
import Box from '../../layouts/Box';
import LoadingIndicator from '../LoadingIndicator';
const PivotTable = React.lazy(() => import('.'));

export default {
    component: PivotTable,
    title: 'PivotTable',
};

const data = [
    {
        customer: 'John',
        amount: 1000,
        discountAmount: 500,
        item: 'Item 1',
        date: '2020/01/02',
        discounted: true,
        status: 'Delivered',
    },
    {
        customer: 'John',
        amount: 500,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/04/01',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'John',
        amount: 2500,
        discountAmount: 50,
        item: 'Item 2',
        date: '2020/05/06',
        discounted: true,
        status: 'Delivered',
    },
    {
        customer: 'Jim',
        amount: 2000,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/02',
        discounted: false,
        status: 'Canceled',
    },
    {
        customer: 'Sarah',
        amount: 100,
        discountAmount: 0,
        item: 'Item 1',
        date: '2019/12/04',
        discounted: false,
        status: 'Returned',
    },
    {
        customer: 'Kim',
        amount: 100,
        discountAmount: 10,
        item: 'Item 2',
        date: '2020/05/06',
        discounted: true,
        status: 'Delivered',
    },
    {
        customer: 'Sarah',
        amount: 2000,
        discountAmount: 0,
        item: 'Item 1',
        date: '2019/12/04',
        discounted: false,
        status: 'Processing',
    },
    {
        customer: 'Kim',
        amount: 1300,
        discountAmount: 0,
        item: 'Item 3',
        date: '2019/11/10',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'Kim',
        amount: 200,
        discountAmount: 0,
        item: 'Item 4',
        date: '2019/11/08',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'Liam',
        amount: 200,
        discountAmount: 0,
        item: 'Item 2',
        date: '2020/03/08',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'Liam',
        amount: 230,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/10',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'Liam',
        amount: 199,
        discountAmount: 15,
        item: 'Item 3',
        date: '2020/04/10',
        discounted: true,
        status: 'Delivered',
    },
    {
        customer: 'Liam',
        amount: 500,
        discountAmount: 130,
        item: 'Item 4',
        date: '2020/05/10',
        discounted: true,
        status: 'Processing',
    },
    {
        customer: 'Liam',
        amount: 200,
        discountAmount: 0,
        item: 'Item 2',
        date: '2020/03/08',
        discounted: false,
        status: 'Delivered',
    },
    {
        customer: 'Liam',
        amount: 230,
        discountAmount: 0,
        item: 'Item 1',
        date: '2020/03/20',
        discounted: false,
        status: 'Delivered',
    },
];

export const Default = () => (
    <Suspense
        fallback={
            <Box width="100%" minHeight="100px" display="flex" justifyContent="center" pt={10}>
                <LoadingIndicator size="large"></LoadingIndicator>
            </Box>
        }
    >
        <PivotTable data={data} />
    </Suspense>
);
