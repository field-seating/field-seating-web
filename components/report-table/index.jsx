import { useCallback } from 'react';
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
import { useSWRConfig } from 'swr';

import { useFetchReports, url } from 'lib/fetch/admin/get-reports';
import Prompt from 'components/ui/prompt';
import usePrompt from 'components/ui/prompt/usePrompt';

import { getReports, properties } from './helpers';
import Menu from './Menu';

const ReportTable = () => {
  const { mutate } = useSWRConfig();
  const { data: reportData } = useFetchReports();

  const reports = getReports(reportData);
  const promptPayload = usePrompt();

  const revalidate = useCallback(() => {
    mutate(url());
  }, [mutate]);

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
                <Td>
                  <Menu
                    reportId={report.id}
                    onPromptOpen={promptPayload.onOpen}
                    revalidate={revalidate}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Prompt
        isOpen={promptPayload.isOpen}
        onClose={promptPayload.onClose}
        onSubmit={promptPayload.onSubmit}
        title={promptPayload.title}
        description={promptPayload.description}
      />
    </Box>
  );
};

export default ReportTable;
