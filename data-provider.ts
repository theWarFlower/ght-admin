//Read all rows

let { data: support_requests, error } = await supabase
  .from('support_requests')
  .select('*')

//Read specific columns

let { data: support_requests, error } = await supabase
  .from('support_requests')
  .select('some_column,other_column')

//Read referenced tables

let { data: support_requests, error } = await supabase
  .from('support_requests')
  .select(`
    some_column,
    other_table (
      foreign_key
    )
  `)

//With pagination

let { data: support_requests, error } = await supabase
  .from('support_requests')
  .select('*')
  .range(0, 9)

//Filtering

let { data: support_requests, error } = await supabase
  .from('support_requests')
  .select("*")

  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])

/*Insert rows

insert lets you insert into your tables. You can also insert in bulk and do UPSERT.

insert will also return the replaced values for UPSERT.

Insert a row
*/

const { data, error } = await supabase
  .from('support_requests')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()

//Insert many rows

const { data, error } = await supabase
  .from('support_requests')
  .insert([
    { some_column: 'someValue' },
    { some_column: 'otherValue' },
  ])
  .select()

//Upsert matching rows

const { data, error } = await supabase
  .from('support_requests')
  .upsert({ some_column: 'someValue' })
  .select()

/*
Update rows
  
update lets you update rows. update will match all rows by default. You can update specific rows using horizontal filters, e.g. eq, lt, and is.

update will also return the replaced values for UPDATE.

Update matching rows 
*/

const { data, error } = await supabase
  .from('support_requests')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()

/*Delete rows

delete lets you delete rows. delete will match all rows by default, so remember to specify your filters!

Delete matching rows
*/

const { error } = await supabase
  .from('support_requests')
  .delete()
  .eq('some_column', 'someValue')