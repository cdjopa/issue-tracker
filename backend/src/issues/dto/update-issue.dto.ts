import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends PartialType(
  OmitType(CreateIssueDto, ['related_project', 'created_by']),
) {}
