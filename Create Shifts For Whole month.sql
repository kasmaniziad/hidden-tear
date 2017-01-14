Declare @FromDate date = '2016-08-20'

Declare @ToDate date = '2016-09-30'

Declare @tmp table (myDate date) 

;with cte (mydate) as
(
	Select
		@FromDate as mydate

	union all
		
	Select
		DATEADD(day, 1, mydate)
	From
		cte
	Where
		mydate < @ToDate
		
)
Insert into 
	@tmp
Select
	*
From
	cte a

Declare shiftCursor cursor
For
Select
	*
From
	@tmp

Declare @ActualShiftDate date

open shiftCursor

fetch next from shiftCursor into @ActualShiftDate 

while (@@fetch_status = 0)
Begin

	EXEC	[ordering].[CreateShift]
		@SectionId = 1,
		@ShiftId = 1,
		@ShiftDate = @ActualShiftDate,
		@LoggedInUserId = 5

		EXEC	[ordering].[CreateShift]
		@SectionId = 1,
		@ShiftId = 2,
		@ShiftDate = @ActualShiftDate,
		@LoggedInUserId = 5

		EXEC	[ordering].[CreateShift]
		@SectionId = 1,
		@ShiftId = 3,
		@ShiftDate = @ActualShiftDate,
		@LoggedInUserId = 5

		fetch next from shiftCursor into @ActualShiftDate 
End

close shiftCursor
deallocate shiftCursor
