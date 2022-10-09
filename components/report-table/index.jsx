import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useFetchReports } from 'lib/fetch/admin/get-reports';

import { getReports, properties } from './helpers';

const ReportTable = () => {
  const { data: reportData } = useFetchReports();

  const reports = getReports(reportData);

  return (
    <Box>
      <Box mb="8">
        <Heading as="h1">爭議照片</Heading>
      </Box>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              {properties.map((property) => (
                <Th key={property.label}>{property.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report) => (
              <Tr key={report.id}>
                {properties.map((property) => (
                  <Td key={property.label}>{property.resolver(report)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportTable;
